import fs from 'fs';
import path from 'path';
import SSR from '../classes/SSR';

const indexPath =
    process.env.NODE_ENV === 'production'
        ? path.resolve(__dirname, '../public/index.html')
        : path.resolve(__dirname, '../../public/index.html');

export default [
    '/buildings/:space',
    (req, res) => {
        fs.readFile(indexPath, 'utf8', async (err, data) => {
            if (err) return res.status(500).json({ message: 'Internal server error' });

            try {
                const ssr = new SSR(req.baseUrl, data);
                const html = await ssr.getHtml();

                return res.send(html);
            } catch (error) {
                const noDataHtml = SSR.getHtmlWithNoData(data);
                return res.send(noDataHtml);
            }
        });
    },
];
