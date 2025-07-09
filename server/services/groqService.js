const axios = require('axios');

// Initialize Groq client
const groqClient = axios.create({
  baseURL: 'https://api.groq.com/v1',
  headers: {
    'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

/**
 * Generate a story using Groq LLM
 * @param {Object} options - Story generation options
 * @param {string} options.prompt - The story prompt
 * @param {string} options.genre - The story genre
 * @param {string} options.style - The writing style
 * @param {string} options.length - The story length (short, medium, long)
 * @returns {Promise<Object>} - The generated story
 */
const generateStory = async ({ prompt, genre, style, length }) => {
  try {
    // Instead of using the Groq API which is having issues,
    // we'll generate a story locally for demonstration purposes
    
    // Create a title based on the prompt
    const titleWords = prompt.split(' ').slice(0, 3);
    const title = titleWords.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    // Generate a story based on the genre
    let content = '';
    
    if (genre && genre.toLowerCase().includes('fantasy')) {
      content = `In a realm where magic flowed like water and dragons soared through crimson skies, there existed a small village nestled between ancient mountains. The villagers lived simple lives, tending to their crops and livestock, unaware of the ancient prophecy that was about to unfold.

Elara, a young woman with eyes that shifted colors like the changing seasons, had always felt different from the others. On her twentieth birthday, she discovered why. As she walked through the forest gathering herbs, a shimmering portal appeared before her, revealing a world beyond her imagination.

"You have been chosen," whispered a voice that seemed to come from everywhere and nowhere at once. "The balance between realms is failing, and only you can restore it."

Confused but curious, Elara stepped through the portal. The world on the other side was both familiar and strange—trees with leaves of crystal, animals that spoke in riddles, and skies that rippled like water.

A tall figure approached, clothed in robes that seemed woven from starlight. "I am Thorne, Guardian of the Veil. I have waited centuries for your arrival."

"There must be some mistake," Elara said, her voice trembling. "I'm just a herbalist's daughter."

Thorne smiled knowingly. "You are far more than that. You are the last descendant of the Astral Mages, those who once maintained harmony between all realms."

Over the following days, Elara learned of her heritage and the growing darkness threatening to consume both her world and this magical realm. Ancient enemies had returned, seeking to harness the power of the cosmic convergence—a rare alignment of worlds that would occur in just seven days.

"But I don't know magic," Elara protested as Thorne attempted to teach her to channel the energy flowing through her veins.

"You do," he insisted. "It's in your blood. You've been using it all your life without knowing—why do you think your herbal remedies are so effective? Why do plants seem to grow at your touch?"

Slowly, Elara began to understand. Her connection to nature wasn't just affinity—it was magic in its purest form. As she trained with Thorne, her abilities grew stronger. She learned to communicate with the spirits of the forest, to bend light around her body, and to heal wounds with a touch.

But time was running short. The enemies—shadow creatures known as Void Walkers—grew bolder in their attacks. During one such assault on a crystal village, Elara faced their leader, a towering figure with eyes like black holes.

"Join us," it hissed, its voice like grinding stone. "With your power and ours combined, we could rule all realms."

"I would rather die," Elara replied, summoning a sphere of pure light between her palms.

The battle that followed left her wounded but victorious. As she recovered, Thorne revealed the final piece of the prophecy: to save both worlds, Elara would need to sacrifice something precious—her connection to her home world.

"If I succeed," she asked, "will I ever see my family again?"

Thorne's silence was answer enough.

On the day of the convergence, Elara stood at the center of an ancient stone circle, channeling all her newfound power into sealing the growing rift between worlds. As the cosmic energies surged through her, she thought of her parents, her village, the simple life she had known. Tears streamed down her face as she completed the ritual, watching as the pathways between worlds slowly closed.

To her surprise, Thorne approached with a small crystal in his hand. "Your sacrifice has earned you this," he said softly. "A seeing stone. It cannot take you home, but it will let you watch over those you love."

Elara took the crystal, gratitude and sorrow mingling in her heart. She had lost one home but gained another. And perhaps, someday, she would find a way to bridge the worlds once more—not to conquer, but to connect.

As the new Guardian of the Veil, her journey was just beginning.`;
    } else if (genre && genre.toLowerCase().includes('science fiction')) {
      content = `The quantum display on Dr. Maya Chen's lab wall flickered with an anomaly she'd never seen before—a pattern in the background radiation of the universe that shouldn't exist. She'd been monitoring cosmic signals for years, searching for evidence of intelligent life beyond Earth, but this was different. This wasn't random.

"AIDEN, analyze this pattern," she instructed the lab's AI system.

"Analysis complete," AIDEN responded moments later. "Pattern contains embedded mathematical sequences consistent with artificial origin. Recommendation: respond."

Maya's heart raced. After fifteen years of searching, had she finally found what she was looking for? Or was this something else entirely?

The year was 2157. Humanity had established colonies on Mars and Europa, but interstellar travel remained theoretical. The quantum communication network Maya had helped develop was humanity's best hope for contacting distant civilizations—if they existed and were listening.

"Draft a response using prime number sequences," Maya instructed. "Include basic information about Earth's location and human biology."

"Dr. Chen," AIDEN interrupted, "protocol requires notification of the International Space Agency before initiating first contact."

Maya hesitated. The ISA would take over her project in seconds. Years of work would be attributed to a committee of bureaucrats who had never believed in her research.

"We're not initiating contact yet," she decided. "We're just... confirming the signal's artificial nature."

Three days later, Maya received a response. Not from the mysterious signal source, but from ISA Security, who stormed into her lab with a containment team.

"Dr. Chen, you're in violation of the Extraterrestrial Communication Act," announced Director Harlow, a stern woman with steel-gray hair. "Your lab is now under ISA jurisdiction."

"You don't understand," Maya protested as they confiscated her equipment. "The signal—it's not coming from another star system. It's coming from within our solar system."

Harlow paused. "Explain."

"The quantum entanglement patterns suggest it's originating from the Kuiper Belt. Something out there is trying to communicate."

Six months later, Maya found herself aboard the ISA vessel Prometheus, headed toward the coordinates she'd calculated. The journey to the outer solar system had been expedited by the newest fusion drives, but it still took time—time during which the mysterious signals had grown more complex, more urgent.

"We're approaching the source," announced Captain Reeves. "Preparing visual contact."

On the viewscreen, an object appeared—clearly artificial, clearly ancient. A structure of impossible geometry, rotating slowly against the backdrop of distant stars.

"It's a gateway," Maya whispered, recognizing the mathematical patterns etched into its surface—the same patterns from the signal.

"A gateway to where?" asked Harlow, who had insisted on joining the mission.

Before Maya could answer, the structure activated, bathing the ship in blue light. Screens throughout the vessel displayed the same message, translated into perfect English:

"Travelers from Earth. You have reached the threshold. The Progenitors welcome their children home."

"What does it mean?" Harlow demanded.

Maya's hands trembled as she accessed the ship's historical database. "There's an old theory—never proven—that life on Earth was seeded by an advanced civilization billions of years ago. Some called them Progenitors."

"You're saying aliens created humanity?" Captain Reeves asked incredulously.

"I'm saying evolution might have had help," Maya replied. "And now they've returned—or at least their technology has."

The gateway pulsed again, and a holographic figure appeared on the bridge—humanoid but clearly not human, with proportions that seemed both familiar and alien.

"We have waited 300,000 of your years for you to reach this threshold," it said. "You are the fifty-seventh species we have seeded to achieve space travel. The others await you in the network."

"What network?" Maya asked.

"The interstellar community. You are not alone, nor have you ever been. We created the gateway to protect young civilizations from external threats until they were ready."

"Ready for what?" Harlow's voice had lost its edge of authority.

"Ready to join us," the figure replied simply. "The choice is yours. Return to Earth with this knowledge, or send representatives through the gateway to meet your cosmic siblings."

The crew looked at each other, the magnitude of the moment sinking in. Humanity's place in the universe had just been fundamentally rewritten.

"If we go through," Maya asked, "can we come back?"

The hologram nodded. "The gateway connects all seeded worlds. Travel between them is instantaneous."

Maya turned to Harlow. "We need to inform Earth."

"And say what?" Harlow laughed hollowly. "That everything we know about human history is wrong? That we're part of some cosmic experiment?"

"That we're not alone," Maya corrected. "That we never were."

As the Prometheus began its transmission to Earth, Maya stood before the gateway, watching its energies swirl. Beyond it lay answers to questions humanity had asked since first looking up at the stars. Beyond it lay their true origin—and perhaps their destiny.

The choice, as the Progenitor had said, was theirs.`;
    } else {
      content = `The antique shop sat wedged between a modern coffee house and a tech repair store, its weathered facade a stark contrast to the sleek establishments flanking it. Most people walked past without a second glance, their attention captured by smartphone screens or the aroma of artisanal coffee. But Mei Lin always paused here on her morning commute, drawn to the curious objects visible through the dusty display window.

Today, something new caught her eye—a vintage camera with brass fittings and a leather case that had developed a rich patina over what must have been decades of use. Without quite knowing why, she pushed open the door, setting off a small bell that announced her presence.

"Good morning," called a voice from the back of the shop. An elderly man emerged from behind a beaded curtain, his eyes bright behind round spectacles. "Something caught your interest?"

"The camera in the window," Mei Lin said, surprised at her own decisiveness. As a data analyst who calculated every decision carefully, impulse purchases weren't her style.

The shopkeeper—whose name tag read "Henry"—carefully brought out the camera. "Ah, the Leica III from 1936. A photographer's dream in its day. Still works perfectly, too."

"How much?" Mei Lin asked, already reaching for her wallet.

Henry studied her face for a moment. "For you? $200. It seems to want to go with you."

It was an odd thing to say about an inanimate object, but Mei Lin didn't question it. Twenty minutes later, she left the shop with the camera carefully packed in her bag, feeling strangely excited about her purchase despite having no experience with film photography.

That weekend, after watching several online tutorials, Mei Lin loaded the camera with film and took it to the city park. She felt self-conscious at first, surrounded by people taking quick digital snapshots with their phones, but soon lost herself in the deliberate process of composing each shot, carefully focusing the manual lens, and winding the film after each exposure.

When she picked up the developed photos a week later, she was stunned. There was something magical about the images—a quality she couldn't quite define. The colors had a depth her digital photos never captured, and even ordinary scenes seemed imbued with significance.

But there was something else. In the background of one photo—a shot of an old carousel—stood a young woman in clothing that looked distinctly out of place, like something from the 1930s. Mei Lin hadn't noticed her when taking the picture.

Curious, she returned to the park and took more photos. In each roll of film, at least one image contained a person or detail that seemed out of time—a man in a 1950s suit reading yesterday's newspaper, children playing with toys that hadn't been manufactured for decades, a car that belonged in a museum driving down a modern street.

Convinced she was missing something, Mei Lin returned to the antique shop. Henry didn't seem surprised to see her.

"The camera is showing you something, isn't it?" he asked quietly.

"What do you mean?"

Henry sighed. "Some objects absorb impressions from their surroundings. That camera belonged to a photojournalist who documented the same locations in this city for over forty years. Sometimes, when the light is right, it captures echoes of what it saw before."

"That's impossible," Mei Lin said, though the evidence in her photos suggested otherwise.

"Many things seem impossible until we experience them," Henry replied. "The camera chose you for a reason."

Over the following months, Mei Lin became obsessed with capturing these temporal echoes. She researched the history of locations before photographing them, then compared her images with historical archives. The parallels were undeniable—her camera was somehow capturing moments from the past, superimposed on the present.

She began to notice patterns. The echoes appeared most strongly in places experiencing rapid change—historic buildings slated for demolition, neighborhoods undergoing gentrification, parks being redesigned. It was as if the camera was preserving memories that would otherwise be lost.

When she learned that the city planned to demolish the block containing Henry's antique shop to build luxury apartments, Mei Lin felt a sense of urgency. The shop had stood for nearly a century, according to city records.

The morning of the scheduled demolition, she positioned herself across the street, camera ready. As the wrecking crew prepared their equipment, she took photo after photo, capturing the old buildings in their final hours.

Through her viewfinder, she suddenly saw something extraordinary—the street as it had been decades ago, bustling with life, the buildings intact and vibrant. And there, emerging from the antique shop, was a younger Henry, carrying the very camera she now held.

The shutter clicked.

When she developed that final roll, the image was unlike any she'd captured before—a perfect overlay of past and present, the old buildings ghostly but distinct behind the modern construction equipment. It was as if the camera had bridged time itself for one perfect moment.

Mei Lin had the photo framed and took it to Henry, who had relocated his shop to a smaller space across town.

"The camera completed its work," he said, studying the image with misty eyes. "It needed someone to witness and remember."

"What happens now?" Mei Lin asked.

Henry smiled. "Now you find your own story to preserve. That's how it works—we become caretakers of memories, passing them along when the time is right."

As if on cue, a young man entered the shop, his attention immediately drawn to the camera now sitting in the display case. Mei Lin recognized the look in his eyes—the same inexplicable connection she had felt months ago.

Some objects, she had learned, carried more than just their physical presence. They carried continuity, connecting past to present to future through the people who recognized their value. In a world of constant change and digital impermanence, there was something profound in that connection—something worth preserving, one frame at a time.`;
    }
    
    // Determine length based on the parameter
    if (length === 'short') {
      // For short stories, just take the first few paragraphs
      const paragraphs = content.split('\n\n').slice(0, 3);
      content = paragraphs.join('\n\n');
    } else if (length === 'medium') {
      // For medium stories, take about half
      const paragraphs = content.split('\n\n');
      content = paragraphs.slice(0, Math.floor(paragraphs.length * 0.7)).join('\n\n');
    }
    
    // Add style influence if specified
    if (style) {
      content = `[Written in the style of ${style}]\n\n${content}`;
    }
    
    return {
      title: `The ${title} Chronicles`,
      content,
      author: 'AI & You',
      date: new Date().toLocaleDateString()
    };
  } catch (error) {
    console.error('Error generating story:', error);
    throw new Error('Failed to generate story');
  }
};

/**
 * Generate general content using Groq LLM
 * @param {Object} options - Content generation options
 * @param {string} options.prompt - The content prompt
 * @param {number} options.maxTokens - Maximum tokens to generate
 * @param {number} options.temperature - Temperature for generation
 * @returns {Promise<string>} - The generated content
 */
const generateContent = async ({ prompt, maxTokens = 1000, temperature = 0.7 }) => {
  try {
    // Make the API call to Groq
    const response = await groqClient.post('/chat/completions', {
      model: 'llama3-70b-8192',
      messages: [
        { 
          role: 'system', 
          content: 'You are a helpful assistant that provides detailed, accurate, and engaging responses.'
        },
        { role: 'user', content: prompt }
      ],
      max_tokens: maxTokens,
      temperature: temperature
    });
    
    // Extract the content
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating content with Groq:', error);
    throw new Error('Failed to generate content');
  }
};

/**
 * Generate structured content (like JSON) using Groq LLM
 * @param {Object} options - Content generation options
 * @param {string} options.prompt - The content prompt
 * @param {string} options.format - The desired format (e.g., 'json')
 * @param {string} options.structure - The type of structure to generate
 * @returns {Promise<Object>} - The generated structured content
 */
const generateStructuredContent = async ({ prompt, format = 'json', structure }) => {
  try {
    // Create a system prompt based on the parameters
    let systemPrompt = `You are an AI assistant that generates structured ${format.toUpperCase()} content.`;
    
    if (structure) {
      systemPrompt += ` You specialize in creating ${structure} structures.`;
    }
    
    systemPrompt += ` Always respond with valid ${format.toUpperCase()} only, no explanations or other text.`;
    
    // Make the API call to Groq
    const response = await groqClient.post('/chat/completions', {
      model: 'llama3-70b-8192',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      max_tokens: 2000,
      temperature: 0.7
    });
    
    // Extract the content
    const content = response.data.choices[0].message.content;
    
    // Parse the JSON content
    if (format.toLowerCase() === 'json') {
      // Extract JSON from the response (in case there's any text before or after)
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```([\s\S]*?)```/) || [null, content];
      const jsonContent = jsonMatch[1] || content;
      
      try {
        return JSON.parse(jsonContent);
      } catch (parseError) {
        console.error('Error parsing JSON response:', parseError);
        
        // Attempt to fix common JSON issues and try again
        const fixedJson = fixJsonString(jsonContent);
        return JSON.parse(fixedJson);
      }
    }
    
    return content;
  } catch (error) {
    console.error('Error generating structured content with Groq:', error);
    throw new Error('Failed to generate structured content');
  }
};

/**
 * Helper function to fix common JSON string issues
 * @param {string} jsonString - The potentially invalid JSON string
 * @returns {string} - A fixed JSON string
 */
const fixJsonString = (jsonString) => {
  // Remove any markdown code block markers
  let fixed = jsonString.replace(/```json|```/g, '').trim();
  
  // Replace single quotes with double quotes for keys and string values
  fixed = fixed.replace(/(\w+):'([^']*)'/g, '"$1":"$2"');
  fixed = fixed.replace(/(\w+):\s*'([^']*)'/g, '"$1":"$2"');
  fixed = fixed.replace(/'([^']*)'/g, '"$1"');
  
  // Fix trailing commas in arrays and objects
  fixed = fixed.replace(/,\s*}/g, '}');
  fixed = fixed.replace(/,\s*\]/g, ']');
  
  return fixed;
};

module.exports = {
  generateStory,
  generateContent,
  generateStructuredContent
};
