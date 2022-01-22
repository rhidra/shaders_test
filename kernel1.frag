#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

uniform sampler2D u_texture;

vec3 conv3(vec2 st, sampler2D text, float kernel[9]) {
  ivec2 texSize = textureSize(text, 0);
  vec2 stepSize = 1.0 / vec2(float(texSize.x), float(texSize.y));

  vec4 sum = vec4(0.);
  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      sum += texture2D(text, vec2(st.x + stepSize.x * float(i%3 - 1), st.y - stepSize.y * float(j%3 - 1))) * kernel[i * 3 + j];
    }
  }

  return sum.rgb; 
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  st.x *= u_resolution.x / u_resolution.y;

  // float kernel[9] = 

  vec3 gx = conv3(st, u_texture, float[9](
    1., 0., -1., 
    2., 0., -2., 
    1., 0., -1. 
  ));

  vec3 gy = conv3(st, u_texture, float[9](
    1., 2., 1., 
    0., 0., 0.,
    -1., -2., -1. 
  ));

  vec3 g = sqrt(gx * gx + gy * gy);

  vec3 color = texture2D(u_texture, st).rgb;

  color = mix(color, vec3(1., 1., 1.), g*(cos(u_time*3.)*.5+.5)*.3);

  gl_FragColor = vec4(color, 1.);
}