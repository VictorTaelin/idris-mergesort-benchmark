"use strict";

const testList = size => {
  const go = (r, x, seed) => {
    const s = (seed * 12345 + 768) % 65536;
    return x === 0 ? r : go([s % 1000, r], x - 1, s);
  }
  return go(null, size, 12345);
}

const mergeSort = (lenLog2, list) => {
  const reverse = list => {
    const go = (r, list) => {
      return !list ? r : go([list[0],r], list[1]);
    }
    return go(null, list);
  };

  const merge = (a, b) => {
    const go = (r, a, b) =>
      a === null && b === null ? reverse(r) :
      a === null ? go([b[0],r], null, b[1]) :
      b === null ? go([a[0],r], a[1], null) :
      a[0] < b[0] ? go([a[0],r], a[1], b) : go([b[0],r], a, b[1]);
    return go(null, a, b);
  };

  const split = (d, list) =>
    d === 0 && list === null ? (t => t([0,null],null)) :
    d === 0 && list !== null ? (t => t([list[0],null],list[1])) :
    split(d-1,list)((lef, list) =>
    split(d-1,list)((rig, list) =>
      (t => t(merge(lef,rig),list))));

  return split(lenLog2, list, (res, list) => res)((l,r) => l);
};

const su = list => {
  const go = (r, list) => list === null ? r : go(r + list[0], list[1]);
  return go(0, list);
}

const nativeSort = list => {
  const toArray = list => {
    const go = (r, list) =>
      list === null ? r : (r.push(list[0]), go(r, list[1]));
    return go([], list);
  };
  const fromArray = array => {
    let list = null;
    for (let i = 0; i < array.length; ++i) {
      list = [array[i], list];
    }
    return list;
  }
  return fromArray(toArray(list).sort((a,b)=>b-a));
}

const log2 = 8 + 8 + 4;
const size = 256 * 256 * 16;
const list = testList(size);

//console.log(su(nativeSort(list)));
console.log(su(mergeSort(log2, list)));
