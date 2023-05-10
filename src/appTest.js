const { describe, expect, it, test } = require("@jest/globals");

const app = require('../src/app');
const request = require('supertest');
const { Musician } = require('../models/Musician.js');

describe('Musician API', () => {
  beforeAll(async () => {
    await Musician.sync({ force: true });
  });

  beforeEach(async () => {
    await Musician.create({
      name: 'John Doe',
      instrument: 'guitar',
    });
  });

  afterEach(async () => {
    await Musician.destroy({ where: {} });
  });

  describe('GET /musicians', () => {
    it('should return all musicians', async () => {
      const res = await request(app).get('/musicians');
      expect(res.length).toEqual(1);
    });
  });

  describe('POST /musicians', () => {
    it('should create a new musician', async () => {
      const res = await request(app)
        .post('/musicians')
        .send({
          name: 'Jane Doe',
          instrument: 'piano'});
      expect(res.statusCode).toEqual(201);
    });
  });

  describe('PUT /musicians/:id', () => {
    it('should update an existing musician', async () => {
      const musician = await Musician.findOne({ where: { name: 'John Doe' } });
      const res = await request(app)
        .put(`/musicians/${musician.id}`)
        .send({
          name: 'Johnny Doe',});
      expect(res.statusCode).toEqual(200);
    });
  });

  describe('DELETE /musicians/:id', () => {
    it('should delete an existing musician', async () => {
      const musician = await Musician.findOne({ where: { name: 'John Doe' } });
      const res = await request(app).delete(`/musicians/${musician.id}`);
      expect(res.statusCode).toEqual(204);
      const deletedMusician = await Musician.findByPk(musician.id);
      expect(deletedMusician).toBe(null);
    });
  });
});
