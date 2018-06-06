package com.shop.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.shop.entity.ScoreRecord;
import com.shop.entity.request.RequestParam;

@Mapper
public interface ScoreRecordMapper {
	
	List<ScoreRecord> listScoreRecord(RequestParam requestParam);
	
	List<ScoreRecord> getScoreRecordByName(RequestParam requestParam);
	
	Integer insertScoreRecord(ScoreRecord scoreRecord);
	
	Integer deleteScoreRecord(Long id);
	
	Integer updateScoreRecord(ScoreRecord scoreRecord);
}