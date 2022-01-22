#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random2d (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float random1d(float a) {
  return fract(sin(a * 43758.5453123));
}

float randomBars(vec2 st) {
  return step(.2, random2d(floor(st)));
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;

  st *= vec2(100., 4.);

  // Translate the rows over time
  float vel = (step(1., mod(st.y, 2.)) - .5) * 2.;
  st.x += vel * u_time * 5.;

  // Glitching effect
  float isGlitching = step(.9, random1d(floor(u_time * 1.)));

  // Display horizontal bars at random positions
  float r = randomBars(st + isGlitching * vec2(fract(u_time*.3) * .5, 0.));
  float g = randomBars(st + isGlitching * vec2(fract(u_time+10.*10.) * .8, 0.));
  float b = randomBars(st + isGlitching * vec2(.1,.1));

  vec3 color = vec3(r, g, b);

  st = fract(st);


  gl_FragColor = vec4(color, 1.);
}