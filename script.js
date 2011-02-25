function random_word(words) {
  return words[Math.floor(Math.random()*words.length)];
}

function transliterate(word) {
  var output = '';

  for (var i = 0; i < word.length; i++ ) {
    output = output + hiragana[word.charAt(i)];
  }
  return output;
}

function set_new_word() {
  word = random_word(words);
  document.getElementById('kana').innerHTML = word;
  return transliterate(word);
}

function show_correct_message(result) {
  result.innerHTML = 'Correct!'
  result.className = 'correct'
}

function show_incorrect_message(result, answer) {
  result.innerHTML = 'Wrong! The correct answer is <strong>' + answer + '</strong>.';
  result.className = 'wrong'
}

window.onload = function(){

  var romaji = set_new_word();

  var input = document.getElementById('input');
  var result = document.getElementById('result');

  input.focus();

  input.onkeypress = function(e) {
    if (!e) {
      e = window.event; /* Hello, IE. */
    }

    if ((e.keyCode == 13) ) {
      if (input.value.toLowerCase() == romaji) {
        show_correct_message(result);
      } else {
        show_incorrect_message(result, romaji);
      }
      romaji = set_new_word();
      input.value = '';
      input.focus();
    }
  }
}
