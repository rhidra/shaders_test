#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;

  st *= 10.;

  vec2 ipos = floor(st);
  vec2 fpos = fract(st);

  float color = random(ipos);

  gl_FragColor = vec4(vec3(color), 1.);
}