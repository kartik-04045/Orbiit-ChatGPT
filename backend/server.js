// import OpenAI from 'openai';
// import 'dotenv/config';

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
// });

// const response = await client.responses.create({
//   model: 'gpt-4o-mini',
//   input: 'what the god?',
// });
// console.log(response.usage);
// console.log(response.output_text);


import 'dotenv/config';
import app from './app.js';

const port = 8080;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});