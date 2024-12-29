import mongoose from 'mongoose';
const {username,password}=process.env;
export const connectionStr="mongodb+srv://"+username+":"+password+"@test-hackhthon.uu0ii.mongodb.net/collection?retryWrites=true&w=majority&appName=test-hackhthon"
mongoose.connect(connectionStr)

if (!connectionStr) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
