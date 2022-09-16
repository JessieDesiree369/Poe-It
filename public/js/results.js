
const getResults = async () => {
  const urlArray = (document.location.href).split("/");
  const term = urlArray[urlArray.length-1];

  const response1 = fetch(`https://poetrydb.org/author/${term}`);
  //const data1 = await response1.json();

  const response2 = fetch(`https://poetrydb.org/title/${term}`);
  //const data2 = await respdddonse2.json();

  const response3 = fetch(`https://poetrydb.org/lines/${term}`);
  //const data3 = await response3.json();

  const results = await Promise.all([response1,response2,response3]);
  const jsondata = await Promise.all([results[0].json(),results[1].json(),results[2].json()]);

  jsondata.forEach(result => console.log(result));

};

const getAllResults = async () => {
  const urlArray = (document.location.href).split("/");
  const term = urlArray[urlArray.length-1];

  const authorURL = `https://poetrydb.org/author,poemcount/${term};10`;
  const titleURL = `https://poetrydb.org/title,poemcount/${term};10`;
  const linesURL = `https://poetrydb.org/lines,poemcount/${term};10`;

  const results = await Promise.all(
    [authorURL, titleURL, linesURL].map((url) =>
      fetch(url)
        .then((response) => response.json())
        .then((data) => data)
    )
  );

  return results;
};

getAllResults().then((data) => {
  const combinedResults = [];
  data.forEach((arr) => {
    arr.forEach((element) => combinedResults.push(element));
  });
  console.log(combinedResults);
});


//getResults();