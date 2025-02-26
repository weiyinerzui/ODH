class enen_Longman {
    constructor() {
        this.name = "Longman";
        this.description = "朗文英英词典";
        this.baseUrl = "https://www.ldoceonline.com/dictionary/";
    }

    async findTerm(word) {
        return new Promise(async (resolve, reject) => {
            try {
                const url = this.baseUrl + encodeURIComponent(word.toLowerCase());
                let data = await fetch(url);
                if (!data.ok) {
                    reject(`Network error: ${data.statusText}`);
                    return;
                }
                
                let html = await data.text();
                
                // Create a temporary DOM parser
                let parser = new DOMParser();
                let doc = parser.parseFromString(html, 'text/html');
                
                // Get the main dictionary content
                let content = doc.querySelector('.dictionary');
                if (!content) {
                    reject('No definition found');
                    return;
                }

                // Clean up unnecessary elements
                let ads = content.querySelectorAll('.ad');
                ads.forEach(ad => ad.remove());
                
                // Format the content
                let result = content.innerHTML;
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }
} 