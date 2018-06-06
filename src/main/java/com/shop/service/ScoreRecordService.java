package com.shop.service;

import com.github.pagehelper.PageInfo;
import com.shop.entity.ScoreRecord;
import com.shop.entity.request.RequestParam;

public interface ScoreRecordService {
	
	PageInfo<ScoreRecord> listScoreRecord(RequestParam request);
	
	PageInfo<ScoreRecord> getScoreRecordByName(RequestParam request);
	
	Integer insertScoreRecord(ScoreRecord scoreRecord);
	
	Integer updateScoreRecord(ScoreRecord scoreRecord);
	
	Integer deleteScoreRecord(Long id);
	
}
