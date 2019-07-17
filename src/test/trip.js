// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import server from '../server';

// const { expect } = chai;
// chai.use(chaiHttp);
// let auth;
// // const url = '/api/v1/auth';
// // const base2 = `${url}/trips`;
// const url = '/api/v1';
// const base = `${url}/auth`;
// const base2 = `${url}/trips`;

// describe('Testing the create trips Endpoint', () => {
//   before(async () => {
//     const res = await chai
//       .request(server)
//       .post(`${base}/signIn`)
//       .send({
//         email: 'okaforjudechukwuebuka@gmail.com',
//         password: 'password',
//       });
//     const { token } = res.body;
//     auth = token;
//   });
//   describe('Create a trip', () => {
//     it('should create a new trip successfully', async () => {
//       const res = await chai
//         .request(server)
//         .post(`${base2}`)
//         .set('Authorization', auth)
//         .send({
//           busid: 1,
//           origin: 'Imo',
//           tripdate: '2019-06-25',
//           destination: 'Ibadan',
//           fare: '10500',
//           status: 'active',
//         });
//       expect(res).to.have.status(200);
//       expect(res.body).to.have.property('status');
//       expect(res.body).to.have.property('message');
//     });

//     it('should return a validation error', async () => {
//       const res = await chai
//         .request(server)
//         .post(`${base2}`)
//         .set('Authorization', auth)
//         .send({
//           busid: 56789,
//           origin: 'I',
//           tripdate: '2019',
//           destination: 'I',
//           fare: '3',
//           status: 'bad',
//         });
//       expect(res).to.have.status(400);
//       expect(res.body).to.have.property('status');
//       expect(res.body).to.have.property('message');
//     });

//     describe('Testing the get all trips method', () => {
//       it('should retrieve trips successfully', async () => {
//         const res = await chai
//           .request(server)
//           .get(`${base2}`)
//           .set('Authorization', auth);
//         expect(res).to.have.status(200);
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('message');
//       });

//       it('should return a validation error', async () => {
//         const res = await chai
//           .request(server)
//           .get(`${base2}`)
//           .set('Authorization', auth);
//         expect(res).to.have.status(400);
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('message');
//       });
//     });

//     describe('Testing cancel a trip method', () => {
//       it('should return trip cancelled successfully', async () => {
//         const res = await chai
//           .request(server)
//           .patch(`${base2}/1`)
//           .set('Authorization', auth);
//         expect(res).to.have.status(200);
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('message');
//       });

//       it('should return  unathorized access', async () => {
//         const res = await chai
//           .request(server)
//           .patch(`${base2}/1`)
//           .set('Authorization', auth);
//         expect(res).to.have.status(200);
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('message');
//       });
//       it('should return a validation error', async () => {
//         const res = await chai
//           .request(server)
//           .patch(`${base2}/1`)
//           .set('Authorization', auth);
//         expect(res).to.have.status(400);
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('message');
//       });
//     });
//   });
// });
