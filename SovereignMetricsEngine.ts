// Beast System 3.0 — Sovereign Metrics Engine
// Real-Time Metric Aggregation, Normalization, and EventBus Streaming

import { EventBus } from "./eventbus-orchestration-layer_ebol-distributed-governance-router_beast3.0_core-module_v1.0.0";
import { StabilityVectorEngine } from "./stability-vector-engine_sve-governance-balance-regulator_beast3.0_core-module_v1.0.0";
import { IdentityContinuityEngine } from "./identity-continuity-engine_ice-persistent-lineage-governor_beast3.0_core-module_v1.0.0";
import { AuthorityChainEngine } from "./AuthorityChainEngine";
import { ConstitutionEngine } from "./ConstitutionEngine";

export type SovereignMetricsPacket = {
  stability: number;
  identity: number;
  authority: number;
  governance: number;
  ethics: number;
  timestamp: number;
};

export class SovereignMetricsEngine {
  private authority: AuthorityChainEngine;
  private constitution: ConstitutionEngine;

  constructor(
    authority: AuthorityChainEngine,
    constitution: ConstitutionEngine
  ) {
    this.authority = authority;
    this.constitution = constitution;

    setInterval(() => this.computeAndBroadcast(), 1000);
  }

  computeAndBroadcast() {
    const packet: SovereignMetricsPacket = {
      stability: this.normalize(StabilityVectorEngine.compute({ core: 1 })),
      identity: this.normalize(
        IdentityContinuityEngine.computeContinuityScore()
      ),
      authority: this.normalize(this.computeAuthorityMetric()),
      governance: this.normalize(this.computeGovernanceMetric()),
      ethics: this.normalize(this.computeEthicsMetric()),
      timestamp: Date.now(),
    };

    EventBus.publish("sovereign:metrics:update", packet);
    return packet;
  }

  normalize(value: number) {
    if (value < 0) return 0;
    if (value > 1) return 1;
    return value;
  }

  computeAuthorityMetric() {
    const conflicts = this.authority.detectConflicts();
    return conflicts.length === 0 ? 1 : 0.5;
  }

  computeGovernanceMetric() {
    const activeRules = this.constitution.getActiveRules();
    return activeRules.length > 0 ? 1 : 0;
  }

  computeEthicsMetric() {
    // Placeholder until EthicsEngine is added
    return 0.8;
  }
}
