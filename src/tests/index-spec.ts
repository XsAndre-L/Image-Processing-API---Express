import supertest from 'supertest';
import app from '../index';

const st = supertest(app);

describe('Test endpoint responses', () => {
    // No Quary Strings
    it('Without Quary Strings /image', async () => {
        const response = await st.get('/image/');
        expect(response.status).toBe(200);
    });

    // File Name & No Extension
    it('File Name & No Extension /image/?filename=fjord', async () => {
        const response = await st.get('/image/?filename=fjord');
        expect(response.status).toBe(200);
    });

    // File Name & Extension
    it('File Name & Extension /image/?filename=fjord.jpg', async () => {
        const response = await st.get('/image/?filename=fjord.jpg');
        expect(response.status).toBe(200);
    });

    // File Name & Width
    it('File name & Width /image/?filename=fjord.jpg&width=500', async () => {
        const response = await st.get('/image/?filename=fjord.jpg&width=500');
        expect(response.status).toBe(200);
    });

    // File Name & Height
    it('File name & Height /image/?filename=fjord.jpg&height=500', async () => {
        const response = await st.get('/image/?filename=fjord.jpg&height=500');
        expect(response.status).toBe(200);
    });

    // File Name & Width & Height
    it('File name & Width & Height /image/?filename=fjord.jpg&width=500&height=500', async () => {
        const response = await st.get(
            '/image/?filename=fjord.jpg&width=500&height=500'
        );
        expect(response.status).toBe(200);
    });

    // Unknown Image
    it('File name & Width & Height /image/?filename=randomname.jpg&width=500&height=500', async () => {
        const response = await st.get(
            '/image/?filename=fjord.jpg&width=500&height=500'
        );
        expect(response.status).toBe(200);
    });
});