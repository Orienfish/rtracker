// the purpose of this file is to blur the content on a given webpage
// right now this is just a static representation - there is no algorithm performing any functionality

// reformat script is run first - unclear will design this better

// blur the second paragraph
p_one = ps[1];
Object.assign(p_one.style,{"color" : "transparent", "text-shadow" : "0 0 5px rgba(0,0,0,0.5)"});