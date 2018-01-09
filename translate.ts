export class Translate {

    private translations: Object = {};

    constructor() {
        this.translations.en = {
            'a few seconds ago': 'a few seconds ago',
            'seconds ago': (p) => `${p.seconds} seconds ago`,
            'a minute ago': 'a minute ago',
            'minutes ago': (p) => `${p.minutes} minutes ago`,
            'an hour ago': 'an hour ago',
            'hours ago': (p) => `${p.hours} hours ago`,
            'a day ago': 'a day ago',
            'days ago': (p) => `${p.days} days ago`,
            'a month ago': 'a month ago',
            'months ago': (p) => `${p.months} months ago`,
            'a year ago': 'a year ago',
            'years ago': (p) => `${p.years} years ago`
        };

        this.translations.fr = {
            'a few seconds ago': 'il y a quelques secondes',
            'seconds ago': (p) => `il y a ${p.seconds} secondes`,
            'a minute ago': 'il y a une minute',
            'minutes ago': (p) => `il y a ${p.minutes} minutes`,
            'an hour ago': 'il y a une heure',
            'hours ago': (p) => `il y a ${p.hours} heures`,
            'a day ago': 'hier',
            'days ago': (p) => `il y a ${p.days} jours`,
            'a month ago': 'il y a un mois',
            'months ago': (p) => `il y a ${p.months} mois`,
            'a year ago': 'il y a un an',
            'years ago': (p) => `il y a ${p.years} ans`
        };
    }

    translate(locale: string, messageKey: string, parameters?: Object): string {

        const translationsInLocale = this.translations[locale];

        if (translationsInLocale) {
            const translation = translationsInLocale[messageKey];

            if (translation) {
                if (typeof translation == 'function') {
                    return translation(parameters);
                }
                return translation;
            }
        }

        return messageKey;
    }

}