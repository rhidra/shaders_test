#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random2d(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float random1d(float st) {
    return fract(sin(st) * 43758.5453123);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;

  st *= vec2(100., 100.);

  float rd = random1d(floor(st.y));

  float isMargin = 1. - step(abs(cos(u_time*3.*rd +2.* rd)* .5), mod(st.y, 1.));

  isMargin = step(.5, rd * isMargin);

  // float vel = (step(1., mod(st.y, 2.)) - .5) * 2.;
  st.x -= max(.4, rd) * u_time * 5.;

  float color = step(.2, random2d(floor(st))) * (1. - isMargin) + isMargin;

  gl_FragColor = vec4(vec3(color), 1.);
}