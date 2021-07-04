import startOfDay from 'date-fns/startOfDay';
import addDays from 'date-fns/addDays';
import endOfDay from 'date-fns/endOfDay';
import { getTheBestPromotionForDate } from '../getTheBestPromotionForDate';

describe('getTheBestPromotionForDate', () => {
    const yesterday = startOfDay(new Date(2021, 6, 3));
    const today = addDays(yesterday, 1);
    const tommorow = addDays(today, 1);

    it('returns no promotion for empty promotions list', () => {
        const theBestPromotionForDate = getTheBestPromotionForDate(today, []);

        expect(theBestPromotionForDate).toEqual(null);
    });

    it('returns promotion with highest percentage for passed day', () => {
        const promotions = [
            {
                id: 1,
                name: 'Yesterday big promotion',
                dateStart: startOfDay(yesterday),
                dateEnd: endOfDay(yesterday),
                discount: {percentage: 90, code: 1 }
            },
            {
                id: 2,
                name: 'Today small promotion',
                dateStart: startOfDay(today),
                dateEnd: endOfDay(today),
                discount: { percentage: 10, code: 2 },
            },
            {
                id: 3,
                name: 'Today highest promotion',
                dateStart: startOfDay(today),
                dateEnd: endOfDay(today),
                discount: { percentage: 40, code: 3 }
            },
            {
                id: 4,
                name: 'Multiple days promotion',
                dateStart: startOfDay(today),
                dateEnd: endOfDay(tommorow),
                discount: { percentage: 5, code: 4 }
            },
            {
                id: 5,
                name: 'Tomorrow big promotion',
                dateStart: startOfDay(tommorow),
                dateEnd: endOfDay(tommorow),
                discount: { percentage: 70, code: 5 }
            }
        ];

        const theBestPromotionForDate = getTheBestPromotionForDate(today, promotions);

        expect(theBestPromotionForDate).toEqual(expect.objectContaining({ name: "Today highest promotion" }));
    });
});
