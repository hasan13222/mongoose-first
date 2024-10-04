import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import fs from 'fs';

export const sendImageToCloud = async (path: string, imageName: string) => {
  cloudinary.config({
    cloud_name: 'ddefobmax',
    api_key: '339652112919529',
    api_secret: 'xYjf3aJHS41UUyAsAUMtK1bIjXo', // Click 'View Credentials' below to copy your API secret
  });
  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(path, {
      public_id: imageName,
    })
    .catch((error) => {
      console.log(error);
    });

  if (uploadResult?.secure_url) {
    
    fs.unlink(path, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('File is deleted successfully');
      }
    });

    return uploadResult;
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
