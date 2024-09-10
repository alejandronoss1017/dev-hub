import { loadPackageDefinition, credentials } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import path from 'path';
import { NextResponse } from 'next/server';

// Path to .proto file
const PROTO_PATH = path.resolve(process.cwd(), 'src/app/api/users/users.proto');

// Load the .proto file
const packageDefinition = loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// Access the package
const usersProto = loadPackageDefinition(packageDefinition).users; 

// Create the gRPC client
const client = new (usersProto as any).UsersService(
  'localhost:5000',
  credentials.createInsecure()
);

// API handler for the GET request
export async function GET() {
  return new Promise<Response>((resolve) => {
    // Call the FindAll method from the gRPC service
    client.FindAll({}, (error: any, response: any) => {
      if (error) {
        resolve(NextResponse.json({ error: error.message }, { status: 500 }));
      } else {
        resolve(NextResponse.json(response));
      }
    });
  });
}
