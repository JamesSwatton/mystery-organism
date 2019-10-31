// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

function pAequorFactory(specimenNum, dna) {
    return {
        specimenNum,
        dna,
        mutate() {
            const baseToMutateIndex = Math.floor(Math.random() * dna.length);
            const newBase = returnRandBase();
            if (dna[baseToMutateIndex] != newBase) {
                dna.splice(baseToMutateIndex, 1, newBase);
            } else {
                mutate();
            }
            return dna;
        }
    };
}

const organism = pAequorFactory(1, mockUpStrand());
console.log(organism);
console.log(organism.mutate());
console.log(organism.mutate());





