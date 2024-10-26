document.getElementById('calculate-btn').addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const startingBid = document.getElementById('bid'); 
  let price = Number(startingBid.value); 

  if (name && price) {
      price *= Number(document.getElementById('education').value);

      price *= Number(document.getElementById('net-worth').value);

      price += Number(document.getElementById('caste').value);

      const skills = document.getElementsByClassName('skills');
      price = getCheckboxValuesFilterReduce(skills, price);

      const age = document.getElementsByName("age");
      price = getRadioValue(age, price);

      const reputations = document.getElementsByClassName('reputation');
      price = getCheckboxValuesForLoop(reputations, price);

      const loveLetter = document.getElementById('love-letter').value;

      const person = {
          bride_groom_name: name,
          final_price: price,
          letter_to_bride_groom: loveLetter
      };

      document.getElementById("result").innerHTML = `
          <p>Your price for ${person.bride_groom_name} is $${person.final_price.toFixed(2)}</p>
          <p>Your love letter: "${person.letter_to_bride_groom}"</p>
      `;
  } else {
      alert('Please enter both name and starting bid.');
  }
});

const getRadioValue = (node_list, price) => {  
  node_list.forEach(item => {
      if (item.checked) {
          price *= Number(item.value);
      }
  });
  return price;
}
const getCheckboxValuesFilterReduce = (html_collection, price) => {
  return Array.from(html_collection)
      .filter(item => item.checked)
      .reduce((acc, item) => acc + Number(item.value), price);
}

const getCheckboxValuesForLoop = (html_collection, price) => {
  for (let i = 0; i < html_collection.length; i++) {  
      if (html_collection[i].checked) {
          const value = Number(html_collection[i].value);
          price = Number.isInteger(value) ? price + value : price * value;
      }
  }
  return price;
}
