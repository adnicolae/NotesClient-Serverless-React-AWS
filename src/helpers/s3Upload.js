import { Storage } from 'aws-amplify';

const s3Upload = async file => {
  const fileName = `${ Date.now() }-${ file.name }`;

  const stored = await Storage.vault.put(fileName, file, {
    contentType: file.type
  });

  return stored.key;
};

export default s3Upload;