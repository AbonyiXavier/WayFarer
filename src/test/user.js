import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const { expect } = chai;
chai.use(chaiHttp);
const url = '/api/v1/auth';
describe('User authenticatation process', () => {
  describe('Register a user succesfully', async () => {
    it('should create an account succesfully', async () => {
      const res = await chai
        .request(server)
        .post(`${url}/signUp`)
        .send({
          email: 'francis@gmail.com',
          firstname: 'francis',
          lastname: 'abonyi',
          phonenumber: '09090909090',
          gender: 'male',
          password: 'password',
        });
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
    it('should return user already exist', async () => {
      const res = await chai
        .request(server)
        .post(`${url}/signUp`)
        .send({
          email: 'francis@gmail.com',
          firstname: 'francis',
          lastname: 'abonyi',
          phonenumber: '09090909090',
          gender: 'male',
          password: 'password',
        });
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
    it('should return a validation error', async () => {
      const res = await chai
        .request(server)
        .post(`${url}/signUp`)
        .send({
          email: 'francisgmaiom',
          firstname: 'f',
          lastname: 'abonyi',
          phonenumber: '09090909090',
          gender: 'male',
          password: 'password',
        });
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
  });

  describe('Testing the signin method', () => {
    it('should signin a user successfully', async () => {
      const res = await chai
        .request(server)
        .post(`${url}/signIn`)
        .send({
          email: 'okaforjudechukwuebuka@gmail.com',
          password: 'password',
        });
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });

    it('should return password incorrect', async () => {
      const res = await chai
        .request(server)
        .post(`${url}/signIn`)
        .send({
          email: 'sandraifeoma22@gmail.com',
          password: 'pass',
        });
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
    it('should return user does not exist', async () => {
      const res = await chai
        .request(server)
        .post(`${url}/signIn`)
        .send({
          email: 'xavier@gmail.com',
          password: 'password',
        });
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
    it('should return a validation error', async () => {
      const res = await chai
        .request(server)
        .post(`${url}/signIn`)
        .send({
          email: 'sandraifeoma22@gmail',
          password: '',
        });
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
    });
  });
});
