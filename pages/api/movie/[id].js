import { apiKey, baseUrl } from "../../../lib/configApi";

export default async (req, res) => {

    const result = await fetch(`${baseUrl}/movie/${req.query.id}?api_key=${apiKey}&language=pt-BR`);
    const json = await result.json();
    console.log('Passou daqui');
    res.status(200).json({
        info: json
    })
}
