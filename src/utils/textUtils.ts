export const levenshteinDistance = (s: string, t: string): number => {
    if (!s.length) return t.length;
    if (!t.length) return s.length;
    const arr = [];
    for (let i = 0; i <= t.length; i++) {
        arr[i] = [i];
        for (let j = 1; j <= s.length; j++) {
            arr[i][j] =
                i === 0
                    ? j
                    : Math.min(
                        arr[i - 1][j] + 1,
                        arr[i][j - 1] + 1,
                        arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
                    );
        }
    }
    return arr[t.length][s.length];
};

function splitTextToWords(text: string):string[] {
    return text.split(" ").filter(word => word.length > 0)
}

function curate(text:string):string{
    let curated = text.replace(/\n/g, ' ');
    curated = curated.replace(/[^a-zA-Z]/g, ' ')
    curated = curated.replace(/\s+/g, ' ');
    return textToWordArray(curated).join(' ')
}

export const getWordDistribution=(text: string): Map<string, number>=> { 
    const words = splitTextToWords(text)
    const wordDistribution = new Map<string, number>()
    for (const word of words) {
        const count = wordDistribution.get(word)
        if (count) {
            wordDistribution.set(word, count + 1)
        } else {
            wordDistribution.set(word, 1)
        }
    }
    return new Map([...wordDistribution.entries()].sort((a, b) => a[1] - b[1]));
}

export const getWordDistributionInSpans = (spans: Array<HTMLSpanElement>): Map<string, Array<number>> => {
    const wordDistribution = new Map<string, Array<number>>()
    spans.forEach((span,index) => { 
        const text = span.innerText
        const words = splitTextToWords(text)

        for (const word of words) {
            const list = wordDistribution.get(word)
            if (list) {
                list.push(index)
            } else {
                wordDistribution.set(word,[index])
            }
        }
    })

    
    return new Map([...wordDistribution.entries()].sort((a, b) => a[1].length - b[1].length));
}

export const textToWordArray=(text: string): string[]=>{
    return text.split(" ").filter(word => word.length > 0)
}

export const spansToWordArray = (spans: Array<HTMLSpanElement>): string[] => {
    let concatenatedText="";
    spans.forEach(s => {
        const text = s.innerText
        concatenatedText += text;
       // const spanTextArray = splitTextToWords(curate(text))
        //s.dataset.nbWords = spanTextArray.length.toString()
        s.dataset.length = "" +curate(text).length
    })
    //concatenatedText = Array.from(spans).map(span => span.innerText).join('');
    return textToWordArray(concatenatedText);
}

export const grow = (searchedText: string, spans: HTMLSpanElement[]): { start: number, end: number } => { 
    const curatedSearchedText = curate(searchedText)
    console.log(curatedSearchedText)
    spansToWordArray(spans)
    const concatenatedText = curate(Array.from(spans).map(span => span.innerText).join(' '));
    console.log(concatenatedText)
    let position = concatenatedText.search(curatedSearchedText);
    const searchedTextNbWords = splitTextToWords(curatedSearchedText).length
    console.log(position)
    const limitedText = concatenatedText.substring(0, position);
    const nbWordsTillPosition = splitTextToWords(limitedText).length
    let spanIndex = 0
    let wordPositionInSpans = 0
    let foundStart = false
    let foundEnd = false
    let startIndex = -1
    let endIndex=-1
    while ((startIndex<0 || endIndex<0) && (spanIndex<spans.length)) {
        const span = spans[spanIndex]
        //wordPositionInSpans += parseInt(span.dataset.nbWords)
        wordPositionInSpans += parseInt(span.dataset.length || "0")
        if (startIndex<0) {
            if (wordPositionInSpans > position) {
                startIndex = spanIndex
            } 
        }
        if (endIndex<0) {
            if (wordPositionInSpans > (position + curatedSearchedText.length)) {
                endIndex = spanIndex
            }
        }
        spanIndex++
    }

    if (startIndex >= 0 && endIndex < 0) {
        endIndex = spans.length-1
    }else if (spanIndex >= spans.length) {
        console.error("not found")
        return {
            start: startIndex,
            end: endIndex,
        }
    }
    return {
        start: startIndex,
        end:endIndex,
    };
}

