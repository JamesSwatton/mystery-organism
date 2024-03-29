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
        },
        compareDNA(specimen) {
            let identicalBaseCount = 0;
            const dnaToCompare = specimen.dna;
            for (let i = 0; i < 15; i ++) {
                if (dna[i] === dnaToCompare[i]) { identicalBaseCount ++; }
            }
            const baseMatchPercentage = Math.floor((identicalBaseCount / 15) * 100);
            // console.log(`These two specimens have ${baseMatchPercentage}% DNA in common.`);
            return baseMatchPercentage;
        },
        willLikelySurvive() {
            let baseCandGCount = 0;
            dna.forEach(base => {
                if (base === 'C' || base === 'G') {
                    baseCandGCount ++;
                }
            });
            const baseCandGMatchPercentage = Math.floor((baseCandGCount / 15) * 100);
            return baseCandGMatchPercentage >= 60;
        }
    };
}

// const organism = pAequorFactory(1, mockUpStrand());
// const organism2 = pAequorFactory(2, mockUpStrand());
// console.log(organism.dna);
// console.log(organism2.dna);
// organism.compareDNA(organism2);
// console.log(organism.willLikelySurvive());

let survivingSpecimens = [];
let idCounter = 1;

while(survivingSpecimens.length != 30) {
    let newOrganism = pAequorFactory(idCounter, mockUpStrand());
    if (newOrganism.willLikelySurvive()) {
        survivingSpecimens.push(newOrganism);
    }
    idCounter ++;
}

// console.log(survivingSpecimens);

let arr = [10, 2, 7, 13, 43, 5];

function averageBaseMatch(organism, specimens) {
    const allMatchPercentages = [];
    specimens.forEach(specimen => {
        if (organism.specimenNum != specimen.specimenNum) {
            allMatchPercentages.push( organism.compareDNA(specimen) );
        }
    });
    const total = allMatchPercentages.reduce((acc, curr) => acc + curr);
    return Math.floor(total / allMatchPercentages.length);
}

function mostRelatedOrganism(specimens) {
    return specimens.reduce((acc, curr) => {
        return averageBaseMatch(acc, specimens) > averageBaseMatch(curr, specimens) ? acc : curr;
    });
}

// console.log(averageBaseMatch(survivingSpecimens[0], survivingSpecimens));
console.log(mostRelatedOrganism(survivingSpecimens));


