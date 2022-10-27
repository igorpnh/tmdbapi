import { apiKey, baseUrl } from "../../lib/configApi"

export default async (req, res) => {
    let q = req.query.q;

    const response = await fetch(`${baseUrl}/search/movie/?api_key=${apiKey}&language=pt-BR&query=${q}`);
    const json = await response.json();
    
    res.status(200).json({ 
        list: json.results
    })
  }
  