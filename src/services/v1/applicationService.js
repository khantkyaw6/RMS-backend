const applicationService = {
	index: async () => {
		try {
			const message = 'This is all application list';
			return {
				status: 200,
				message,
				data: {
					isSuccess: true,
					data: [
						{
							title: 'Application title',
							desc: 'Application desc',
						},
					],
				},
			};
		} catch (error) {
			throw new Error(error);
		}
	},
	store: async () => {},
	show: async () => {},
	update: async () => {},
	delete: async () => {},
};

module.exports = applicationService;
