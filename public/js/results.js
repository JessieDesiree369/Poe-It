function showResults(results){
  localStorage.setItem("PoeItResults", JSON.stringify(results));
  for(let i = 0 ; i < results.length ; i++){
    let blockElement = document.getElementById(`result-block-${i}`);
    blockElement.hidden = false;
    let tElement = document.getElementById(`title-${i}`);
    tElement.textContent = results[i].title;
    tElement.href = "/readPoem";
    let aElement = document.getElementById(`author-${i}`);
    aElement.textContent = results[i].author;
  }
}

function viewPoem(cid){
  document.location.replace(`/readPoem/${cid}`);
}

const getAllResults = async () => {
  const urlArray = (document.location.href).split("/");
  const term = urlArray[urlArray.length-2];

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
  let currentID = 0;
  data.forEach((arr) => {
    // --------- Combine each list of results that
    // --------- is actually an array/has any results
    if(Array.isArray(arr)) {
      arr.forEach((element) => {
        // --------- Add each result that has not already been
        // --------- added to combinedResults to combinedResults
        const titleAuthorId = `${element.title},${element.author}`;
        console.log("titleAuthorId: "+titleAuthorId);
        if(!titleAuthorList.includes(titleAuthorId)) {
          titleAuthorList.push(titleAuthorId);

          // let poemlines = "";
          // element.lines.forEach((line) => {
          //   poemlines += line + "\n";
          // });

          combinedResults.push(
            {
              id: currentID,
              title: element.title,
              author: element.author,
              lines: element.lines
            }
          );
          let titleLink = document.getElementById("title-"+currentID);
          titleLink.addEventListener("click", () => viewPoem(currentID));
          currentID++;
        }
      });
    }
  });
  console.log(combinedResults);
  showResults(combinedResults);
});
