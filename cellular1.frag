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

vec2 random2(vec2 st) {
  return vec2(random(st), random(st*100. + 1000.));
}

mat2 rotate(float a) {
  return mat2(cos(a), -sin(a), sin(a), cos(a));
}

float voronoi(vec2 st) {
  vec2 i_st = floor(st);
  vec2 f_st = fract(st);

  float dist = 1.;

  for (int y = -1; y < 2; y++) {
    for (int x = -1; x < 2; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 point = random2(i_st + offset);
      point = 0.5 + 0.5*sin(u_time + 6.2831*point);
      float d = length(point - f_st + offset);

      dist = min(dist, d);
    }
  }

  return dist;
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;

  st *= 10.;

  st.x += .5 * u_time;
  st.y += .2 * u_time;

  float dist = 0.;
  dist += .5 * voronoi(st * 1.);
  dist += .25 * voronoi(st * 2.);
  dist += .125 * voronoi(st * 4.);
  dist += .0625 * voronoi(st * 8.);

  dist *= 1.3 + .2 *cos(u_time * 1.);

  vec3 color = mix(vec3(1., 0., 0.), vec3(0., 1., 1.), dist);

  gl_FragColor = vec4(color, 1.);
}