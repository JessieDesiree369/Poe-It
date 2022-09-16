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

  let combinedResults = []; // --------- Create an array to hold search result objects
  let titleAuthorList = []; // --------- Create an array to hold easily comparable String IDs
  data.forEach((arr) => {
    // --------- Combine each list of results that
    // --------- is actually an array/has any results
    if(Array.isArray(arr)) {
      arr.forEach((element) => {
        console.log(element.title);
        console.log(element.author);
        // --------- Add each result that has not already been
        // --------- added to combinedResults to combinedResults
        const titleAuthorId = `${element.title},${element.author}`;
        if(!titleAuthorList.includes(titleAuthorId)) {
          combinedResults.push(element);
          titleAuthorList.push(titleAuthorId);
        }
      });

    }
  });
  console.log(combinedResults);
});