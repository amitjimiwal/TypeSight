import _ from 'lodash';
import word from '@/lib/data/words.json';
import sentence from '@/lib/data/sentences.json';
export default function shuffleWords(preference: string) {
     switch (preference) {
          case 'words':
               return _.shuffle(word).slice(0, 50);
          case 'sentences':
               return _.shuffle(sentence).slice(0, 50);
          default:
               return _.shuffle(word).slice(0, 50);
     }
}