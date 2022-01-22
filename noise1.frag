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

float renderLayer(vec2 st, float f, float seed) {
  float r1 = rand(floor(u_time * 2. * f + seed));
  float r2 = rand(floor(u_time * 2. * f + seed + 1.));

  float n = noise(st + vec2(1000. * r1, 1000. * r2));

  float limit = .5 + .6 * cos(2.*PI*f * u_time);
  return smoothstep(limit-.1, limit+.1, n);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;

  st *= 100.;

  float f = 1. / 10.;

  float r = renderLayer(st, f, 0.);
  float g = renderLayer(st, f, 1.);
  float b = renderLayer(st, f, 2.);

  gl_FragColor = vec4(vec3(r, g, b), 1.);
}