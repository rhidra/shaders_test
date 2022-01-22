#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

uniform sampler2D u_texture;

uniform vec2 u_leftEye;
uniform vec2 u_rightEye;

float clamp_(float a, float b, float t) {
  return max(a, min(b, t));
}

float eyeStar(vec2 st, vec2 eye, float offset) {
  vec2 p = eye - st;
  float d = length(p);
  float a = atan(p.y, p.x);
  a = (a + PI) / (2.*PI);
  a += cos(d * 10. - u_time + 10.*offset) * (.02 + (cos(u_time) * .5 + .5) * .02);
  a += u_time / 100. * offset;

  a *= 5.;
  a = fract(a);
  a /= .3;
  a = 4.0*a*(1.0-a);

  return clamp_(0., 1., a);
}

float eyeCircle(vec2 st, vec2 eye) {
  vec2 p = eye - st;
  float d = length(p);
  d = 1. - exp(-2. * pow(d / .03, 2.));
  return clamp_(0., 1., d);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  vec2 leftEye = vec2(u_leftEye.x, u_resolution.y - u_leftEye.y) / u_resolution;
  vec2 rightEye = vec2(u_rightEye.x, u_resolution.y - u_rightEye.y) / u_resolution;
  vec2 center = (leftEye + rightEye) / 2.;

  vec3 color = texture2D(u_texture, st).rgb;

  float l = 1. - eyeStar(st, leftEye, 1.);
  float r = 1. - eyeStar(st, rightEye, -1.);

  float cl = eyeCircle(st, leftEye);
  float cr = eyeCircle(st, rightEye);

  vec3 hue = mix(vec3(1., 1., 1.), vec3(186., 255., 248.)/255., length(center - st));

  float final = 1. - r*l*cl*cr;
  color = color * (1. - final) + final * hue;
  // color = vec3(c);

  gl_FragColor = vec4(color, 1.);
}