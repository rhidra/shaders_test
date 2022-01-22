#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

uniform sampler2D u_texture;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  vec2 mouse = vec2(u_mouse.x, u_resolution.y-u_mouse.y) / u_resolution;


  float slices = 12.;

  st -= .5;
  // st -= ;

  st *= .8;

  float d = length(st);
  float a = atan(st.y, st.x); // [-PI, PI]
  a = (a + PI) / (2.*PI); // [0, 1]

  // Discretize in sections
  a *= slices;
  float ai = floor(a);
  a = fract(a);

  float min_a = PI/2. -.5;
  float max_a = PI/2. +.5;
  a = mix(min_a, max_a, a) * mod(ai, 2.) 
    + mix(max_a, min_a, a) * (1. - mod(ai, 2.));

  st = vec2(d * cos(a), d * sin(a));

  vec3 color = texture2D(u_texture, st + mouse).rgb;
  // color = vec3(st + mouse, 0.);
  // color = vec3(mod(ai, 2.));

  gl_FragColor = vec4(color, 1.);
}