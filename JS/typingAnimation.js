// TODO:: TypingEffect is a function which works similar to Typed.js Library Effect

function typingEffect ( greet, { userData, loop = true, typeSpeed = 120, backspacePause = 500, delSpeed = 100 }) 
{
  const stringDisplay = (count) =>
  {
    let i = 1;
  
    let status = setInterval((count) =>
    {
      greet.innerHTML = userData[count].substring(0, i) + "|";
    
      if (i == userData[count].length)
      {
        clearInterval(status);
        setTimeout( (loop) =>
        {
          // ! Call stringDelete function to Delete String from Display :->
          if (loop)
            stringDelete(count); 
        }, backspacePause, loop);
      }

      ++i;
    }, typeSpeed, count);
  };
 
  const stringDelete = (count) =>
  {
    let i = userData[count].length;
   
    let status = setInterval((count) =>
    {
      greet.innerHTML = userData[count].substring(0, i) + "|";
     
      if (i == 0)
      {
        clearInterval(status);
       
        if (++count < userData.length)
        {
          setTimeout(() =>
          {
            // ! Again Call Display function to Display Next Set of Strings :->
            stringDisplay(count); 
          }, 100);
        }
        else
        {
          setTimeout(() =>
          {
            // ! Repeat the loop of Typing all over Again :->
            stringDisplay(0); 
          }, 100);
        }
      }

      --i;
    }, delSpeed, count);
  };
  
  stringDisplay(0);
}