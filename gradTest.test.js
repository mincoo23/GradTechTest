function createMenuData(data) {
  const initialMap = {};
  data.forEach((element) => {
    const splitElem = element.split('/');
    const parent = splitElem[0];
    const child = splitElem[1];
    if (typeof child === 'undefined') {
      return;
    }
    if (!Array.isArray(initialMap[parent])) {
      initialMap[parent] = [];
    }
    initialMap[parent].push(child);
  });
  return createArray(initialMap);
}

function createArray(myMap) {
  const finalArray = [];
  Object.keys(myMap).forEach(function(key) {
    finalArray.push({title: key, data: myMap[key]});
  });
  return finalArray;
}

describe('menu Data Generator', () => {
  it('creates correct data structure ', () => {
    const data = [
      'parent1/parent1child',
      'parent1/parent1child2',
      'parent2/parent2child',
      'parent2/parent2child2',
      'parent1/parent1child3',
      'parent3',
      'parent3/parent3child1',
      'parent4',
    ];

    const expectedResult = [
      {
        title: 'parent1',
        data: ['parent1child', 'parent1child2', 'parent1child3'],
      },
      {title: 'parent2', data: ['parent2child', 'parent2child2']},
      {title: 'parent3', data: ['parent3child1']},
    ];

    const actualResult = createMenuData(data);
    expect(actualResult).toMatchObject(expectedResult);
  });
});
