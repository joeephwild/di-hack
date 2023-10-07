// interface MindsDBResponse {
//   data: any[]; // Define the actual structure of the response data
// }

// type FetchDataResponse = any; // You can update this type as needed

// type FetchDataParams = {
//   authorUsername: string;
//   searchText: string;
// };

// import axios, { AxiosInstance } from "axios";
// import { getTokenFromHeaders } from "./getToken";

// export const mindDbQueryCall = async (
//   authorUsername: string,
//   searchText: string
// ): Promise<FetchDataResponse | null> => {
//   try {
//     const loginResponse = await axios.post(
//       "https://cloud.mindsdb.com/cloud/login",
//       {
//         email: "johnsonafuye@gmail.com",
//         password: "Password",
//       }
//     );

//     const createAxiosInstance = (): AxiosInstance => {
//       const sessionToken = getTokenFromHeaders(loginResponse.headers);
//       console.log({ sessionToken });

//       return axios.create({
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${sessionToken}`,
//         },
//       });
//     };

//     const query = `SELECT * FROM mindsdb.mindsdb.tutor_model WHERE author_username = '${authorUsername}' AND text = '${searchText}';`;

//     const fetchData = async (): Promise<MindsDBResponse> => {
//       try {
//         const axiosInstance = createAxiosInstance();
//         const response = await axiosInstance.post(
//           "https://cloud.mindsdb.com/api/sql/query",
//           {
//             query,
//           }
//         );
//         return response.data;
//       } catch (error) {
//         console.error("Error:", error);
//         throw error;
//       }
//     };

//     const data = await fetchData();
//     console.log({ data });

//     if (data.data.length > 0) {
//       const firstRow = data.data[0];
//       console.log({ firstRow });
//       return firstRow[0];
//     }
//     return null;
//   } catch (error) {
//     throw error;
//   }
// };

const apiUrl = "https://open-ai21.p.rapidapi.com/conversationgpt35";

async function fetchAIResponse(userMessage) {
  const rapidApiKey = "fb5458dc5amsh935a82bf692231cp139b57jsne56249dad61d"; // Replace with your RapidAPI key

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
    },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
      web_access: false,
      stream: false,
    }),
  };

  try {
    const response = await fetch(apiUrl, options);
    const result = await response.json();
    console.log(result.BOT);
    return result.BOT;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Error occurred while fetching AI response.";
  }
}

export default fetchAIResponse;
