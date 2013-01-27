var EducationLevels = [
    'Dropout',
    'High School',
    'Bachelors',
    'Masters',
    'Doctorate'
];

var HairColor = [
    'Blonde',
    'Brown',
    'Black',
    'Red',
    'Dyed',
    'Bald'
];

var EyeColor = [
    'Blue',
    'Brown',
    'Green',
    'Grey'
];

var Religion = [
    'Satanist',
    'Christian',
    'Jewish',
    'Muslim',
    'Wiccan',
    'Atheist'
];

var Personality = [
  'Funny',
  'Sassy',
  'Artistic',
  'Active',
  'Deadpan',
  'Sarcastic'
];

var Traits = {
    Education: null,
    HairColor: null,
    EyeColor: null,
    BodyType: null,
    Cost: null
};

var Costs = [
  5, 10, 15, 15, 20, 20, 25, 25, 25,
  30, 30, 30, 35, 35, 35, 35, 40, 40,
  40, 40, 45, 45, 45, 45, 45, 45, 50,
  50, 50, 50, 50, 50, 50, 55, 55, 55,
  55, 55, 55, 60, 60, 60, 60, 65, 65,
  65, 65, 70, 70, 70, 75, 75, 75, 80,
  80, 85, 85, 90, 95, 100
];


function getRandomPerson() {
    var traits = {
        hairColor: getRandomTrait(HairColor),
        eyeColor: getRandomTrait(EyeColor),
        personality: getRandomTrait(Personality),
        religion: getRandomTrait(Religion),
        educationLevel: getRandomTrait(EducationLevels)
    };

    var desires = {
        hairColor: getRandomDesire(HairColor),
        eyeColor: getRandomDesire(EyeColor),
        personality: getRandomDesire(Personality),
        religion: getRandomDesire(Religion),
        educationLevel: getRandomDesire(EducationLevels)
    };

    var cost = getRandomTrait(Costs);
    var name = 'Jesse Doe';

    var gender = getRandomInt(0,1) ? 'male' : 'female';

    var person = {
        name: name,
        gender: gender,
        traits: traits,
        desires: desires,
        cost: cost,
        print: printPerson
    };

    return person;
}

function printPerson(person) {
    person = person || this;

    console.log('----');
    console.log('Name:', person.name);
    console.log('Traits:');
    console.log('Hair Color:', person.traits.hairColor);
    console.log('Eye Color:', person.traits.eyeColor);
    console.log('Personality:', person.traits.personality);
    console.log('Education Level:', person.traits.educationLevel);

    console.log('Desires:');
    console.log('Hair Color:', person.desires.hairColor);
    console.log('Eye Color:', person.desires.eyeColor);
    console.log('Personality:', person.desires.personality);
    console.log('Education Level:', person.desires.educationLevel);
    console.log('----');
}

function createPopulation(n) {
    var pop = [];
    for (var i = 0; i <= n; i++) {
        pop.push(getRandomPerson());
    }
    return pop;
}

function createNames(pop) {
  var popSize = pop.length;
  namey.get({
    count:popSize,
    callback: function(n) {
      console.log(n);
      for (var i = 0; i < n.length; i++) {
        pop[i].name = n[i];
      }
    },
    frequency: 'all'
  });
}

function getRandomDesire(type) {
  var hasDesire = getRandomInt(0, 100) > 40;
  return hasDesire ? getRandomTrait(type) : 'Any';
}

function getRandomTrait(type) {
    var idx = getRandomInt(0, type.length - 1);
    return type[idx];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(function() {
  window.population = createPopulation(60);
  var cardTemplate = $('#cardtemplate');

  var total = 0;

  population.forEach(function(person) {
    total++;
    var card = cardTemplate.clone();
    card.removeAttr('id').removeAttr('style');

    var img = card.find('img.pic');
    if(person.gender === 'male') {
      img.attr('src', 'ProfileSilhouette.jpg');
    } else {
      img.attr('src', 'ProfileSilhouette2.jpg');
    }

    var nameEl = card.find('.trait .name');
    nameEl.text(person.name);
    var hairTrait = card.find('.trait .hair');
    hairTrait.text(person.traits.hairColor);
    var eyesTrait = card.find('.trait .eyes');
    eyesTrait.text(person.traits.eyeColor);
    var religionTrait = card.find('.trait .religion');
    religionTrait.text(person.traits.religion);
    var educationTrait = card.find('.trait .education');
    educationTrait.text(person.traits.educationLevel);
    var personalityTrait = card.find('.trait .personality');
    personalityTrait.text(person.traits.personality);

    var hairDesire = card.find('.desire .hair');
    hairDesire.text(person.desires.hairColor);
    var eyesDesire = card.find('.desire .eyes');
    eyesDesire.text(person.desires.eyeColor);
    var religionDesire = card.find('.desire .religion');
    religionDesire.text(person.desires.religion);
    var educationDesire = card.find('.desire .education');
    educationDesire.text(person.desires.educationLevel);
    var personalityDesire = card.find('.desire .personality');
    personalityDesire.text(person.desires.personality);

    var costDiv = card.find('.cost');
    costDiv.text('$' + person.cost);

    $(document.body).append(card);

    if(total === 8) {
      $(document.body).append($('<div class="page-break"></div>'));
      total = 0;
    }
  });
});