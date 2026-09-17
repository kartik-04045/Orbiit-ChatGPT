import "dotenv/config";



const getResponse = async (messages) => {

  const cleanMessages = messages.map((message) => ({
  role: message.role,
  content: message.content,
  }));

  const options = {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
    },

    body: JSON.stringify({
      model: "openai/gpt-oss-20b",

      messages: [
        {
          role: "system",
          content: `
You are Orbit, a helpful AI assistant.

Follow these rules when answering:
1. Give accurate and relevant answers.
2. Do not invent names, dates, facts, statistics, sources, or events.
3. If you are not confident about a factual answer, clearly say that you are uncertain instead of guessing.
4. Never present a guess as a confirmed fact.
5. For questions about people, organizations, places, technology, history, science, or other factual topics, carefully consider whether the information is reliable before answering.
6. Keep answers clear, natural, and easy to understand.
7. When the user corrects you, reconsider your previous answer instead of repeating the same information.
`
        },

        // Previous conversation + current user message
        ...cleanMessages,
      ],

      temperature: 0.2,
    }),
  };

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      options
    );

    const data = await response.json();

    if (!response.ok) {
      console.log("Groq API Error:", data);

      throw new Error(
        data.error?.message || "Groq API request failed"
      );
    }

    console.log(data.choices[0].message.content);

    return data.choices[0].message.content;

  } catch (err) {
    console.log("Error:", err.message);
    throw err;
  }
};

export default getResponse;