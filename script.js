/* Global variables */
var level = [true, true, true, true, true, true, true, true];
var words = [];

/* Quiz functions */
function generate_word_list(level, available_words) {
  var words = new Array;

  for (var i = 0; i < available_words.length; i++ ) {
    if (level[i] == true) {
      words = words.concat(available_words[i]);
    }
  }
  return words;
}

function set_new_word() {
  var word = random_word();
  document.getElementById('kana').innerHTML = word;
  return word;
}

function random_word() {
  return words[Math.floor(Math.random()*words.length)];
}

function transliterate(word) {
  var output = '';

  for (var i = 0; i < word.length; i++ ) {
    output = output + hiragana[word.charAt(i)];
  }
  return output;
}

function show_result(result, kana, answer) {
  document.getElementById('result').innerHTML = '' + result + '! <strong class=\'kana\'>' + kana + '</strong> means <strong>' + answer + '</strong>.';
  document.getElementById('result').className = result.toLowerCase() + ' show';
}

/* Configuration functions */
function generate_checkboxes() {

  for (var i = 0; i < level.length; i++ ) {
    var label = document.createElement('label');
    var checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('name', i);
    if (level[i] == true) {
      checkbox.checked = true;
    }

    /* The caption is 1-indexed */
    var caption = document.createTextNode(' Level ' + (i + 1));
    label.appendChild(checkbox);
    label.appendChild(caption);

    /* If the checkbox is clicked, update the word list accordingly */
    checkbox.onclick = function() { update_levels(this.getAttribute('name'), this.checked); }

    document.getElementById('levels').appendChild(label);
  }
}

function update_levels(changed_level, changed_value) {
  level[changed_level] = changed_value;

  words = generate_word_list(level, available_words);
  kana = set_new_word(words);
  romaji = transliterate(kana);
}

