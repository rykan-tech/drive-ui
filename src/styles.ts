import { StyleSheet } from 'aphrodite/no-important';

import { Depths } from '@uifabric/fluent-theme/lib/fluent/FluentDepths';
import { MotionDurations, MotionTimings } from '@uifabric/fluent-theme/lib/fluent/FluentMotion';

export const allSyles = StyleSheet.create({
	button: {
		transitionDuration: MotionDurations.duration1,
		transitionTimingFunction: MotionTimings.standard,
		boxSizing: "border-box",
		cursor: "default",
		userSelect: "none",
		mozUserSelect: "none",
		//boxShadow: "0 0 0 0.5px",

		':hover': {
			boxShadow: Depths.depth8,
		},

		':active': {
			boxShadow: Depths.depth4,
			color: "inherit",
		}
	}
});

export default allSyles;