export interface GeoJson {
  type: string;
  features: Feature[];
}

export interface Feature {
  id: number;
  type: FeatureType;
  geometry: Geometry;
  properties: Properties;
}

export interface Geometry {
  type: GeometryType;
  coordinates: number[];
}

export enum GeometryType {
  Point = "Point",
}

export interface Properties {
  id: number;
  speed: number;
  heading: number;
  accuracy: number;
  altitude: number;
  latitude: number;
  longitude: number;
  walking_at: Date;
  speed_accuracy: number;
}

export enum FeatureType {
  Feature = "Feature",
}
