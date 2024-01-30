export function getLanguage(): string {
    if (localStorage.getItem('language')) {
        return localStorage.getItem('language') as string
    }
    if (navigator.language.split('-')[0] === 'fr') {
        return 'fr'
    }
    return 'en'
}

export function setLanguage(language: string) {
    localStorage.setItem('language', language)
}