import {client, q} from './config';

// https://docs.fauna.com/fauna/current/drivers/javascript#streaming
const watch = ({logger}) => {
  const stream = client.stream.document(
    q.Ref(q.Collection('count'), '330713808092791378')
  );
  stream
    .on('snapshot', (snapshot) => {
      const {data} = snapshot;
      logger(data);
    })
    .on('version', (version) => {
      const {document} = version;
      const {data} = document;
      logger(data);
    })
    .on('error', (error) => {
      logger(error);
      stream.close();
    })
    .start();
  return stream;
};

const getDoc = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const {data} = await client.query(
        q.Get(q.Ref(q.Collection('count'), '330713808092791378'))
      );
      resolve(Object.assign({status: 200, ...data}));
    } catch (error) {
      reject({status: 404, message: error.description});
    }
  });
};

const upsertDoc = ({count}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {data} = await client.query(
        q.If(
          q.Not(q.Exists(q.Ref(q.Collection('count'), '330713808092791378'))),
          q.Create(q.Collection('count'), {
            data: {
              count,
            },
          }),
          q.Update(q.Ref(q.Collection('count'), '330713808092791378'), {
            data: {
              count,
            },
          })
        )
      );
      resolve(Object.assign({status: 200, ...data}));
    } catch (error) {
      reject({status: 404, message: error.description});
    }
  });
};

export {upsertDoc, getDoc, watch};
