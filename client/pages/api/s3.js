import S3 from 'aws-sdk/clients/s3';

console.log(process.env.S3_ACCESS_KEY);
console.log(process.env.S3_SECRET);

const s3 = new S3({
  region: 'eu-central-1',
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET,
  signatureVersion: 'v4',
});

export default async (req, res) => {
  console.log('to jest req.body', req.body);

  const { type, name } = JSON.parse(req.body);

  const fileParams = {
    Bucket: 'meetbe-images',
    Key: `profilePhotos/${name}`,
    Expires: 60,
    ContentType: type,
    ACL: 'public-read',
  };

  const url = await s3.getSignedUrlPromise('putObject', fileParams);
  res.status(200).send({ url });
};
