/* === CONFIG === */
let magicMode = Math.random() > 0.5 ? 'AI' : 'WA';  
let waStep = 1; 
let sName = "";  

/* === AI LOGIC === */
async function callGroq(promptText) {  
    const status = document.getElementById('ai-status');  
    let apiKey = localStorage.getItem('groq_key');  
    
    if (!apiKey) {  
        apiKey = prompt("Paste your Groq API Key (gsk_...):");  
        if (apiKey) localStorage.setItem('groq_key', apiKey.trim());  
        else return;  
    }  

    status.innerText = "phesty is typing... 💬";  
    
    try {  
        // Puter Net Fetch Fix for v2  
        const response = await puter.net.fetch("https://api.groq.com/openai/v1/chat/completions", {  
            method: "POST",  
            headers: {   
                "Authorization": "Bearer " + apiKey,   
                "Content-Type": "application/json"   
            },  
            body: JSON.stringify({  
                model: "llama-3.3-70b-versatile",  
                messages: [  
                    { role: "system", content: "Act as a witty, street-smart UK roadman. Use funny London slang (peak, allow it, neek, p's, peng, slime, dun know, bait, wallahi). Max 15 words." },  
                    { role: "user", content: promptText }  
                ]  
            })  
        });  
        
        const data = await response.json();  
        if (data.choices && data.choices[0]) {  
            status.innerText = data.choices[0].message.content;  
        } else if (data.error) {  
            status.innerText = "API Error: " + data.error.message;  
            localStorage.removeItem('groq_key');  
        }  
    } catch (e) {   
        status.innerText = "Connection peak! Check your key. 🤟";   
        localStorage.removeItem('groq_key');  
    }  
}  

/* === CORE FUNCTIONS === */
export function handleMagic() {  
    const input = document.getElementById('magic-input');  
    const val = input.value.trim();  
    if (!val) return;  

    if (magicMode === 'AI') { 
        callGroq(val); 
        input.value = ""; 
    } else {  
        if (waStep === 1) {   
            sName = val;   
            document.getElementById('magic-title').innerText = `What's the word, ${sName}?`;   
            input.value = ""; 
            input.placeholder = "Talk to me...";   
            document.getElementById('magic-btn').innerText = "Send it";   
            waStep = 2;   
        } else {   
            window.open(`https://wa.me/254768946798?text=Yo Phestone, ${sName} says: ${val}`, '_blank');   
            document.getElementById('magic-title').innerText = "Vibe Sent! 🚀"; 
            input.value = "";   
        }  
    }  
}  

export function initMagic() {  
    const title = document.getElementById('magic-title');  
    const input = document.getElementById('magic-input');  
    const btn = document.getElementById('magic-btn');  
    
    if (magicMode === 'AI') {   
        title.innerText = "yoow! do u wanna know something? 😏";   
        input.placeholder = "Ask Phesty Ai...";   
        btn.innerText = "Ask";   
    } else {   
        title.innerText = "Tell me something... 💬";   
        input.placeholder = "Name?";   
        btn.innerText = "Next";   
    }  
}

// Global Bridge
window.handleMagic = handleMagic;
window.initMagic = initMagic;
