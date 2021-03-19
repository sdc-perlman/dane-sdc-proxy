import fs from 'fs';
import path from 'path';
import SSR from '../classes/SSR';

module.exports = [
    '/buildings/:space',
    (req, res) => {
        fs.readFile(path.resolve(__dirname, '../../public/index.html'), 'utf8', async (err, data) => {
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
