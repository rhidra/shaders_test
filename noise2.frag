#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float rand(float a) {
    return fract(sin(a) * 43758.5453123);
}

mat2 rotate(float a) {
  return mat2(cos(a), -sin(a), sin(a), cos(a));
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  float a = random(i);
  float b = random(i + vec2(1., 0.));
  float c = random(i + vec2(0., 1.));
  float d = random(i + vec2(1., 1.));

  vec2 u = smoothstep(0., 1., f);

  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;

  st *= vec2(3., 10.);
  float n = noise(st * 1.);

  st *= rotate(cos(u_time/30.)*PI*2.*n);

  float color = smoothstep(.0, .7, abs((sin(st.y * 10. *3.1415)+1.0))*.5);


  gl_FragColor = vec4(vec3(color), 1.);
}